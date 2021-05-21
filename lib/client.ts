import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

const API_ROOT = "/api/graphql";

export const client = getSdk(new GraphQLClient(API_ROOT));
