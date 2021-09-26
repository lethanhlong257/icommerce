import {db} from './core-services'

// this feature does not require to response to user immediately. So that,
// this fucntion can move to the queue as Kafka queue or SQS queue
// so that it can execute in the background
export async function saveActivity(action, data = {}) {
  await db.Activity.create({
    action, data
  })
}
