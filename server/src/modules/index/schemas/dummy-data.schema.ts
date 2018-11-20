import {ComparableSchema, SchemaTypes} from "@sugoi/core";

export const DummyDataSchema = {"amount": ComparableSchema.ofType(SchemaTypes.NUMBER).setMandatory(true).setMin(2)};