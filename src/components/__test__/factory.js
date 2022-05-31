import { factory } from 'factory-girl';
import { User } from './mockData';

import moment from 'moment';
import Chance from 'chance';

const chance = new Chance();

factory.define('User', User, () => {
  return {
    email: factory.sequence('user.email', (n) => `dummy-user-${n}@est.test`),

    password: factory.chance('word', { syllables: 4 }),
    id: factory.sequence(Math.floor(Math.random() * 10)),
    firstName: factory.chance('name'),
    lastName: factory.chance('last'),
    about: factory.chance('paragraph', { sentences: 2 }),
    createdAt: () => moment().subtract('1 month').toDate(),
    updatedAt: () => moment().add('1 month').toDate(),
  };
});

export default factory;
