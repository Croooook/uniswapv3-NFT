import { log } from "@graphprotocol/graph-ts";
import {
  Collect,
  DecreaseLiquidity,
  IncreaseLiquidity,
  Transfer,
} from "../../generated/NonfungiblePositionManager/NonfungiblePositionManager";
import { createOrLoadPosition } from "../entities";

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
  
  
}

export function handleTransfer(event: Transfer): void {
  
}