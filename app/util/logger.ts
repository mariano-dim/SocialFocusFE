import {Injectable, provide, Provider} from '@angular/core';

// do whatever you want for logging here, add methods for log levels etc.
@Injectable()
export class MyLogger {

  get log() {
            return console.log.bind(console);
  }

  get debug() {
        return console.debug.bind(console);
    }
}

export var LOGGING_PROVIDERS: Provider[] = [
      provide(MyLogger, {useClass: MyLogger}),
    ];
