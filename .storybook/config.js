import React, { useState } from "react";
import { configure, addDecorator } from "@storybook/react";

function loadStories() {
  require("../index.stories.js");
}

configure(loadStories, module);