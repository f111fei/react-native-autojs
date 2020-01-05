import { NativeModules } from "react-native";

const { RNAutojsModule } = NativeModules;

export class Autojs {
    public static run(script: string): void {
        return RNAutojsModule.run();
    }
}