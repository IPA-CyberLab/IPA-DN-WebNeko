import { Moment } from "../../Imports";

export class TestClass
{
    public static Test(): void
    {
        console.log("Test - " + Moment().format("M - D （dd）"))
    }
}
