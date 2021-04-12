import { Moment } from "../../Imports";
import { TestClass } from "./Test";

export class TestClass3
{
    public static Test3(): void
    {
        console.log("Test3 - " + Moment().format("M - D （dd）"))

        TestClass.Test4();
    }
}
