import {Mongo} from 'meteor/mongo';

export const Metrics = new Mongo.Collection('metrics');
export const influxdbCollection = new Mongo.Collection(null);