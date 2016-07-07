import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Metrics = new Mongo.Collection('metrics');
