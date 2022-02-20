import { BigInt, log } from "@graphprotocol/graph-ts";
import { BIG_INT_ZERO } from "./const";
import { PoolCreated } from "../../generated/Factory/Factory";
import { Pool as PoolTemplate } from "../../generated/templates";
import { Pool } from "../../generated/schema";
import { isSupportedToken } from "../entities";

export function handlePoolCreated(event: PoolCreated): void {
  let hasSupportedToken =
    isSupportedToken(event.params.token0) ||
    isSupportedToken(event.params.token1);
  if (!hasSupportedToken) {
    return;
  }

  let pool = new Pool(event.params.pool.toHexString());

  
  pool.save();

  // create the tracked contract based on the template
  PoolTemplate.create(event.params.pool);

  log.info("[Factory] PoolCreated pool={}", [
    pool.id,
  
  ]);
}