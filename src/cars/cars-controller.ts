import { RequestHandler } from 'express';
import { CarModel, Car } from './car-schema';

import crypto from 'node:crypto';
import { log } from 'debug';

export const getCarController: RequestHandler = async (_req, res) => {
  try {
    const foundCars = await CarModel.find({}).exec();
    res.json(foundCars);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCardController: RequestHandler<
  unknown,
  Car | Error,
  Omit<Car, 'id'>
> = async (req, res) => {
  const id = crypto.randomUUID();
  const car: Car = {
    id,
    ...req.body,
  };
  try {
    await CarModel.create(car);
    res.status(201).json(car);
  } catch (error: any) {
    res.status(500).json(error);
  }
};

export const getCarByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { email } = res.locals;
  log.debug(`The email in the request is ${email}. Use with caution`);
  try {
    const student = await CarModel.findById(id).exec();
    if (student === null) {
      res.sendStatus(404);
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCarByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const dbRes = await CarModel.updateOne({ _id: id }, { ...req.body }).exec();
    if (dbRes.matchedCount === 0) {
      res.sendStatus(404);
    }

    if (dbRes.modifiedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCarByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const { id } = req.params;

  try {
    const dbRes = await CarModel.deleteOne({ _id: id }).exec();
    if (dbRes.deletedCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
