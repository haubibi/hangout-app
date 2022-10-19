import * as graphqlServer from "./graphql/index";
import onParticipateChange from "./participateRequestOnchange_cloudFunction/index";
import onTaskDelete from "./taskOnDelete_cloudFunction";

export const graphql = graphqlServer;
export const onParticipateChangeFc = onParticipateChange;
export const onTaskDeleteFc = onTaskDelete;
