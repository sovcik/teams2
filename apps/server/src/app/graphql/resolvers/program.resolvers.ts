import { QueryResolvers, MutationResolvers, Program } from '../../generated/graphql';
import { ApolloContext } from '../apollo-context';
import { Resolver } from '../type-resolver';

export const queryResolvers: QueryResolvers<ApolloContext> = {
  getProgram: async (_parent, { id }, { dataSources }) => dataSources.program.getProgram(id),
  getPrograms: async (_parent, { filter }, { dataSources }) =>
    dataSources.program.getPrograms(filter),
};

export const typeResolver: Resolver<Program> = {
  managers: async ({ id }, _args, { dataSources }) => dataSources.program.getProgramManagers(id),
  events: async ({ id }, _args, { dataSources }) => dataSources.program.getProgramEvents(id),
  invoiceItems: async ({ id }, _args, { dataSources }) =>
    dataSources.invoice.getProgramInvoiceItems(id),
  registrations: async ({ id }, _args, { dataSources }) =>
    dataSources.registration.getProgramRegistrations(id),
};

export const mutationResolvers: MutationResolvers<ApolloContext> = {
  createProgram: (_parent, { input }, { dataSources }) => dataSources.program.createProgram(input),
  updateProgram: (_parent, { id, input }, { dataSources }) =>
    dataSources.program.updateProgram(id, input),
  deleteProgram: (_parent, { id }, { dataSources }) => dataSources.program.deleteProgram(id),

  addProgramManager: (_parent, { programId, userId }, { dataSources }) =>
    dataSources.program.addProgramManager(programId, userId),
  removeProgramManager: (_parent, { programId, userId }, { dataSources }) =>
    dataSources.program.removeProgramManager(programId, userId),

  createProgramInvoiceItem: (_parent, { programId, item }, { dataSources }) =>
    dataSources.invoice.createProgramInvoiceItem(programId, item),
  updateProgramInvoiceItem: (_parent, { programId, itemId, item }, { dataSources }) =>
    dataSources.invoice.updateProgramInvoiceItem(programId, itemId, item),
  deleteProgramInvoiceItem: (_parent, { programId, itemId }, { dataSources }) =>
    dataSources.invoice.deleteProgramInvoiceItem(programId, itemId),
};
