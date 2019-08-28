import React, { useState } from "react";
import { configure, addDecorator } from "@storybook/react";

function loadStories() {
  require("../src/index.stories.js");
}

configure(loadStories, module);