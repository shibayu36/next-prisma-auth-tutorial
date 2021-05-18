import path from "path";
import { queryType, makeSchema, objectType, mutationType } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";

const Query = queryType({
  definition(t) {
    t.list.field("getAllUsers", {
      type: "User",
      resolve(_, _args, ctx) {
        return ctx.prisma.user.findMany({});
      },
    });
    t.crud.users();
    t.crud.user();
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.field("deleteAllUsers", {
      type: "String",
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.prisma.user.deleteMany({});
        return `${count} users deleted.`;
      },
    });
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
  types: [Query, Mutation, User],
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
