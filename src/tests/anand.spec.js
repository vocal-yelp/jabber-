import React from "react";
import { create } from "react-test-renderer";
import * as testjabs from "../components/LoadJabs/LoadJabs";
import MapContainer, * as testmap from "../components/MapContainer/MapContainer";
import * as nav from "../components/AppNavigation/AppNavigation";

import axios from "axios";
import LoadUserJabs from "../components/LoadUserJabs/LoadUserJabs";

describe("Examining the syntax of Jest tests", () => {
  it("sums numbers", () => {
    expect(1 + 2).toEqual(3);
    expect(2 + 2).toEqual(4);
  });
});

jest.mock("axios");
describe("testjabs", () => {
  it("shows a list of jabs created", async () => {
    const response = {
      data: [{ name: "jabs" }, { name: "jabber" }]
    };
    axios.get.mockResolvedValue(response);
    const component = create(<Jabs />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    const root = component.root;
    const listOfNames = root.findAll(element => element.type === "h3");
    expect(listOfNames[0].props.children).toBe("jab");
    expect(listOfNames[1].props.children).toBe("jabs");
  });
});

jest.mock("axios");
describe("audio recording", () => {
  it("shows a list of of jabs", async () => {
    const response = {
      data: [{ name: "blob" }, { name: "recording" }]
    };
    axios.get.mockResolvedValue(response);
    const component = create(<ProfilePage />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    const root = component.root;
    const listOfNames = root.findAll(element => element.type === "h3");
    expect(listOfNames[0].props.children).toBe("jabber");
    expect(listOfNames[1].props.children).toBe("jabber2");
  });
});

jest.mock("axios");
describe("good recording", () => {
  it("testing recording", async () => {
    const response = {
      data: [{ name: "fast location track" }, { name: "location in position" }]
    };
    axios.get.mockResolvedValue(response);
    const component = create(<Chickfila />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    const root = component.root;
    const listOfNames = root.findAll(element => element.type === "h3");
    expect(listOfNames[0].props.children).toBe("Chick-Fil-a Chicken Sandwich");
    expect(listOfNames[1].props.children).toBe("Chick-Fil-a Deluxe Sandwich");
  });
});

jest.mock("axios");
describe("jabber back", () => {
  it("got jabber", async () => {
    const response = {
      data: [{ name: "jabber3" }, { name: "blob connected" }]
    };
    axios.get.mockResolvedValue(response);
    const component = create(<LoadUserJabs />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    const root = component.root;
    const listOfNames = root.findAll(element => element.type === "h3");
    expect(listOfNames[0].props.children).toBe("Jabber brought");
    expect(listOfNames[1].props.children).toBe("google location");
  });
});

jest.mock("axios");
describe("Jabber 4", () => {
  it("brought to test", async () => {
    const response = {
      data: [{ name: "test capture" }, { name: "test completed" }]
    };
    axios.get.mockResolvedValue(response);
    const component = create(<MapContainer />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    const root = component.root;
    const listOfNames = root.findAll(element => element.type === "h3");
    expect(listOfNames[0].props.children).toBe("LipJabber");
    expect(listOfNames[1].props.children).toBe("Jabber done");
  });
});
