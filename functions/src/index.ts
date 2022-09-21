import * as graphqlServer from "./graphql/index";
import onParticipateChange from "./participateRequestOnchange/index";

export const graphql = graphqlServer;
export const onParticipateChangeFc = onParticipateChange;
