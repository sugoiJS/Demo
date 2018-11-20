import {ComparableSchema, SchemaTypes} from "@sugoi/core";

export const DummyDataIdSchema = ComparableSchema.ofType(SchemaTypes.STRING).setRegex("([a-z])+");