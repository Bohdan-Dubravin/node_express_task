import express from "express";
import { IdSchema, NoteSchema, UpdateNoteSchema } from "../schema/noteSchema";

export const validateNote =
  (schema: NoteSchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

export const validateUpdateNote =
  (schema: UpdateNoteSchema, idSchema: IdSchema) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await schema.validate(req.body);
      await idSchema.validate(req.params);
      next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
