import { Moment } from "../../Imports";
import { TestClass2 } from "./Test2";

export class TestClass
{
    public static Test(): void
    {
        console.log("Test - " + Moment().format("M - D （dd）"))

        TestClass2.Test2();
    }

    public static Test4(): void
    {
        console.log("Test4 - " + Moment().format("M - D （dd）"))
    }
}

