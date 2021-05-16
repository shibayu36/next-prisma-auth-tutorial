import path from "path";
import { queryType, makeSchema, objectType } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

const Query = queryType({
  definition(t) {
    t.crud.users();
    t.crud.user();
  },
});

const User = objectType({
  name: "User",
  definition(t) {
    t.model.name();
    t.model.id();
  },
});

export const schema = makeSchema({
  types: [Query, User],
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    typegen: path.join(process.cwd(), "generated", "nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated", "schema.graphql"),
  },
  contextType: {
    module: path.join(process.cwd(), "graphql", "context.ts"),
    export: "Context",
  },
});
