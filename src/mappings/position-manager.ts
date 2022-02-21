import { log,BigInt } from "@graphprotocol/graph-ts";
import {
  Collect,
  DecreaseLiquidity,
  IncreaseLiquidity,
  Transfer,
} from "../../generated/NonfungiblePositionManager/NonfungiblePositionManager";
import {
  ADDRESS_ZERO,
  BIG_INT_ZERO,
  UNISWAP_V3_FACTORY_ADDRESS,
  UNISWAP_V3_POSITION_MANAGER_ADDRESS,
} from "./const";

import { Position } from "../../generated/schema";
import { NonfungiblePositionManager } from "../../generated/NonfungiblePositionManager/NonfungiblePositionManager";
import { Factory as FactoryContract } from "../../generated/Factory/Factory";


export function createOrLoadPosition(tokenId: BigInt): Position | null {
  let contract = NonfungiblePositionManager.bind(
    UNISWAP_V3_POSITION_MANAGER_ADDRESS
  );
  let positionCall = contract.try_positions(tokenId);
  if (positionCall.reverted) {
    // the call reverts in situations where the position is minted
    // and deleted in the same block
    return null;
  }

  let positionResult = positionCall.value;
  let token0 = positionResult.value2;
  let token1 = positionResult.value3;

  

  let position = Position.load(tokenId.toString());
  if (position == null) {
    position = new Position(tokenId.toString());
  }
    
    let factoryContract = FactoryContract.bind(UNISWAP_V3_FACTORY_ADDRESS);
    let fee = positionResult.value4;
    let poolAddress = factoryContract.getPool(token0, token1, fee);
    position.owner = ADDRESS_ZERO;
    position.pool = poolAddress.toHexString();
    position.tickLower = BigInt.fromI32(positionResult.value5);
    position.tickUpper = BigInt.fromI32(positionResult.value6);
    position.liquidity = BIG_INT_ZERO;
    
    position.save();

   

  return position;
}




export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  let position = createOrLoadPosition(event.params.tokenId);

  // position was not able to be fetched or is not supported
  if (position == null) {
    return;
  }

  position.liquidity = position.liquidity.plus(event.params.liquidity);
  position.save();

  log.info(
    "[NonfungiblePositionManager] IncreaseLiquidity position={} liquidity={}",
    [position.id, event.params.liquidity.toString()]
  );
}

export function handleDecreaseLiquidity(event: DecreaseLiquidity): void {
  let position = createOrLoadPosition(event.params.tokenId);

  // position was not able to be fetched or is not supported
  if (position == null) {
    return;
  }

  position.liquidity = position.liquidity.minus(event.params.liquidity);
  position.save();

  log.info(
    "[NonfungiblePositionManager] DecreaseLiquidity position={} liquidity={}",
    [position.id, event.params.liquidity.toString()]
  );
}

export function handleCollect(event: Collect): void {
  
  let position = createOrLoadPosition(event.params.tokenId);

  // position was not able to be fetched or is not supported
  if (position == null) {
    return;
  }
  position.save();

  log.info(
    "[NonfungiblePositionManager] Collect position={} amount0={} amount1={}",
    [
      event.params.tokenId.toString(),
      event.params.amount0.toString(),
      event.params.amount1.toString(),
    ]
  );
}

export function handleTransfer(event: Transfer): void {
  let position = createOrLoadPosition(event.params.tokenId);

  // position was not able to be fetched or is not supported
  if (position == null) {
    return;
  }

  position.owner = event.params.to;
  position.save();

  log.info("[NonfungiblePositionManager] Transfer position={} from={} to={}", [
    position.id,
    event.params.from.toHexString(),
    event.params.to.toHexString(),
  ]);
}