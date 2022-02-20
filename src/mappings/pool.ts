import { BigInt, log } from "@graphprotocol/graph-ts";
import { BIG_INT_1E6, BIG_INT_ZERO } from "./const";
import {
  Burn,
  Flash,
  Initialize,
  Mint,
  Pool as PoolABI,
  Swap,
} from "../../generated/templates/Pool/Pool";
import { Pool } from "../../generated/schema";

export function handleInitialize(event: Initialize): void {
  let pool = Pool.load(event.address.toHexString());
  if (pool == null) {
    return;
  }

 
  pool.save();

  log.info("[Pool] Initialize pool={}", [
    pool.id,
    
  ]);
}

export function handleMint(event: Mint): void {
  
}

export function handleBurn(event: Burn): void {
  
}

export function handleSwap(event: Swap): void {
  
}

export function handleFlash(event: Flash): void {
  
  
}