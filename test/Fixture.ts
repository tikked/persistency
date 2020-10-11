import { clearInterval } from 'timers';
import {
  ApplicationEnvironment,
  Attribute,
  Context,
  ContextSchema,
  FeatureFlag,
  Toggle
} from 'tikked-core';

export function timeout(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function becomesTrue(
  condition: () => boolean,
  frequencyMs = 10,
  timeoutMs = 1000
): Promise<unknown> {
  let interval;
  return Promise.race<unknown>([
    new Promise(resolve => {
      interval = setInterval(() => {
        if (condition()) {
          resolve();
        }
      }, frequencyMs);
    }),
    timeout(timeoutMs).then(() => {
      clearInterval(interval);
      throw new Error(`Timout while waiting for condition to be true ${condition}`);
    })
  ]);
}

export function createFeatureFlag(id?: string) {
  return new FeatureFlag(id || createId(), createName(), createDescription(), [createToggle()]);
}

export function createToggle() {
  return new Toggle(true, createContext());
}

export function createContext() {
  return new Context({});
}

let idCounter = 1;
export function createId() {
  return 'some_id' + idCounter++;
}

let nameCounter = 1;
export function createName() {
  return 'some_name' + nameCounter++;
}

let stringCounter = 1;
export function createString() {
  return 'some_string' + stringCounter++;
}

let descriptionCounter = 1;
export function createDescription() {
  return 'some_desc' + descriptionCounter++;
}

export function createAttribute(id?: string) {
  return new Attribute(
    id || createId(),
    createName(),
    createDescription()
  );
}

export function createContextSchema(attrs: Attribute[] = []) {
  return new ContextSchema(attrs);
}

export function createApplicationEnvironment(id?: string) {
  return new ApplicationEnvironment(
    id || createId(),
    createName(),
    createDescription(),
    createContextSchema(),
    []
  );
}
