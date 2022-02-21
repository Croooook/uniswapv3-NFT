
import { PoolCreated } from "../../generated/Factory/Factory";
import { Pool as PoolTemplate } from "../../generated/templates";
import { Pool } from "../../generated/schema";


export function handlePoolCreated(event: PoolCreated): void {
  

  let pool = new Pool(event.params.pool.toHexString());

  
  pool.save();

  // create the tracked contract based on the template
  
  PoolTemplate.create(event.params.pool);
  
}