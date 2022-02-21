
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

  
}

export function handleMint(event: Mint): void {
  
}

export function handleBurn(event: Burn): void {
  
}

export function handleSwap(event: Swap): void {
  
}

export function handleFlash(event: Flash): void {
  
  
}