import { expect, use as chaiUse } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { RestApiStream } from '../src/persistency/RestApiStream';
import {
  createApplicationEnvironment,
} from './Fixture';
chaiUse(sinonChai);
chaiUse(chaiAsPromised);

describe('RestApiStream', () => {
  describe('constructor', () => {
    context('given valid coder', () => {
      // Arrange
      const appEnv = createApplicationEnvironment();

      context('when called with empty url path', () => {
        it('should throw an error', () => {
          // Act
          expect(() => {
            const res = new RestApiStream('');
          })
            // Assert
            .to.throw('empty');
        });
      });
    });
  });
});
