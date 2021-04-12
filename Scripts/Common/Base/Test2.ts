import { Moment } from "../../Imports";
import { TestClass3 } from "./Test3";

export class TestClass2
{
    public static Test2(): void
    {
        console.log("Test2 - " + Moment().format("M - D （dd）"))

        TestClass3.Test3();
    }
}
