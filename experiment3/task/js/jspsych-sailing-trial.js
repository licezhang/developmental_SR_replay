(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // js/src/jspsych-sailing-trial.tsx
  var waitForAnimation = (el) => new Promise((resolve) => {
    const animationEnded = () => {
      el.removeEventListener("animationend", animationEnded);
      resolve();
    };
    el.addEventListener("animationend", animationEnded);
  });
  function sleep(ms) {
    return new Promise((resolve) => jsPsych.pluginAPI.setTimeout(resolve, ms));
  }
  var getElement = (selector) => __async(void 0, null, function* () {
    while (document.querySelector(selector) === null) {
      yield new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  });
  jsPsych.plugins["sailing-trial"] = (() => {
    const plugin = { info: {}, trial: {} };
    plugin.info = {
      name: "sailing-trial",
      description: "",
      parameters: {
        island_order: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Island order ['A', 'B']",
          default: ["A", "B"],
          array: true,
          description: "Island assignment"
        },
        boat_order: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Boat order ['A', 'B', 'C', 'D']",
          default: ["A", "B", "C", "D"],
          array: true,
          description: "Boat assignment"
        },
        boat: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: "Boat",
          default: null,
          description: "Boat shown on a trial. null indicates free choice."
        },
        island: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: "Island",
          default: null,
          description: "Starting island. null indicates choice of islands."
        },
        reward_probabilities: {
          type: jsPsych.plugins.parameterType.FLOAT,
          pretty_name: "Reward Probabilities",
          default: null,
          array: true,
          description: "Reward probaibilities for each boat for each trial."
        },
        stage_2: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: "Stage 2",
          default: true,
          description: "Include boat choice and reward"
        },
        end_dwell_time: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: "End Dwell Time",
          default: 0,
          description: "Number of ms to dwell on end of trial"
        },
        stage_1_choices: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Stage 1 Choices",
          default: ["ArrowLeft", "ArrowRight"],
          array: true,
          description: "Valid choices at stage 1"
        },
        stage_2_choices: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Stage 2 Choices",
          default: ["ArrowLeft", "ArrowRight"],
          array: true,
          description: "Valid choices at stage 2"
        },
        show_instructions: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: "Show Instructions",
          default: false,
          description: "Whether to show instructions"
        },
        text_home_trial: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Home Trial Text",
          default: null,
          description: "Custom prompt for boat visiting island"
        },
        text_island_choice: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Island Choice Text",
          default: null,
          description: "Custom prompt for choosing an island"
        },
        text_boat_choice: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: "Boat Choice Text",
          default: null,
          description: "Custom prompt for choosing a boat"
        },
        choice_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: "Choice duration",
          default: null,
          description: "How long to listen for responses before trial ends. If null, no limit."
        },
        reward_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: "Reward duration",
          default: null,
          description: "How long to allow collecting the reward. If null, no limit."
        },
        progress: {
          type: jsPsych.plugins.parameterType.FLOAT,
          pretty_name: "Progress (Percent complete)",
          default: null,
          description: "Percent of progress bar to fill. If null, no progress bar is shown."
        },
        warn_above_threshold: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: "Warn timeouts above threshold",
          default: false,
          description: "Whether to show that subjects will fail with more timeouts"
        }
      }
    };
    plugin.trial = (display_element, trial) => __async(void 0, null, function* () {
      let new_html = '<div id="jspsych-sailing-trial">';
      new_html += '<div id="background_opacity">';
      new_html += '<div id="background_zoom">';
      new_html += '<img id="ocean" src="img/ocean_background.png"/>';
      new_html += `<img id="islands" src="img/islands_${trial.island_order[0]}_${trial.island_order[1]}.png"/>`;
      new_html += '<img id="fog" src="img/foggy_background.png"/>';
      new_html += "</div>";
      new_html += '<div id="progress-border" style="visibility: hidden">';
      new_html += '<div id="progress-bar"></div>';
      new_html += "</div>";
      new_html += "</div>";
      new_html += '<div id="boat_0_left_container" style="visibility: hidden">';
      new_html += `<img class="boat_left" id="boat_0_left" src="img/boat_${trial.boat_order[0]}_left.png"/></div>`;
      new_html += '<div id="boat_2_left_container" style="visibility: hidden">';
      new_html += `<img class="boat_left" id="boat_2_left" src="img/boat_${trial.boat_order[2]}_left.png"/></div>`;
      new_html += '<div id="boat_1_right_container" style="visibility: hidden">';
      new_html += `<img class="boat_right" id="boat_1_right" src="img/boat_${trial.boat_order[1]}_right.png"/></div>`;
      new_html += '<div id="boat_3_right_container" style="visibility: hidden">';
      new_html += `<img class="boat_right" id="boat_3_right" src="img/boat_${trial.boat_order[3]}_right.png"></img></div>`;
      new_html += '<div id="boat_0_bottom_container" style="visibility: hidden">';
      new_html += `<img class="boat_bottom" id="boat_0_bottom" src="img/boat_${trial.boat_order[0]}_bottom.png"/></div>`;
      new_html += '<div id="boat_1_bottom_container" style="visibility: hidden">';
      new_html += `<img class="boat_bottom" id="boat_1_bottom" src="img/boat_${trial.boat_order[1]}_bottom.png"/></div>`;
      new_html += '<div id="boat_2_bottom_container" style="visibility: hidden">';
      new_html += `<img class="boat_bottom" id="boat_2_bottom" src="img/boat_${trial.boat_order[2]}_bottom.png"/></div>`;
      new_html += '<div id="boat_3_bottom_container" style="visibility: hidden">';
      new_html += `<img class="boat_bottom" id="boat_3_bottom" src="img/boat_${trial.boat_order[3]}_bottom.png"/></div>`;
      new_html += '<img id="dock_bottom" style="visibility: hidden" src="img/dock_bottom.png"/>';
      new_html += '<img id="dock_left" style="visibility: hidden" src="img/dock_left.png"/>';
      new_html += '<img id="dock_right" style="visibility: hidden" src="img/dock_right.png"/>';
      new_html += '<img id="reward" style="visibility: hidden" src="img/gold.png"/>';
      new_html += '<img id="noreward" style="visibility: hidden" src="img/noreward.png"/>';
      new_html += '<div id="plus_one" style="visibility: hidden">+1</div>';
      new_html += '<div id="diag_box"></div>';
      new_html += '<div id="instructions-box"><div id="instructions"></div></div>';
      display_element.innerHTML = new_html;
      const background_zoom = yield getElement("#background_zoom");
      const background_opacity = yield getElement("#background_opacity");
      const fog = yield getElement("#fog");
      const boat_0_left_container = yield getElement("#boat_0_left_container");
      const boat_2_left_container = yield getElement("#boat_2_left_container");
      const boat_1_right_container = yield getElement("#boat_1_right_container");
      const boat_3_right_container = yield getElement("#boat_3_right_container");
      const boat_0_bottom_container = yield getElement("#boat_0_bottom_container");
      const boat_1_bottom_container = yield getElement("#boat_1_bottom_container");
      const boat_2_bottom_container = yield getElement("#boat_2_bottom_container");
      const boat_3_bottom_container = yield getElement("#boat_3_bottom_container");
      const boats_bottom = [boat_0_bottom_container, boat_1_bottom_container, boat_2_bottom_container, boat_3_bottom_container];
      const dock_bottom = yield getElement("#dock_bottom");
      const dock_left = yield getElement("#dock_left");
      const dock_right = yield getElement("#dock_right");
      const reward = yield getElement("#reward");
      const failure = yield getElement("#noreward");
      const plus_one = yield getElement("#plus_one");
      const diag_box = yield getElement("#diag_box");
      diag_box.classList.add("diag_uncovered");
      const instructions = yield getElement("#instructions");
      const instructions_box = yield getElement("#instructions-box");
      const progress_border = yield getElement("#progress-border");
      const progress_bar = yield getElement("#progress-bar");
      const island_boats = [
        [boat_0_left_container, boat_1_right_container],
        [boat_2_left_container, boat_3_right_container]
      ];
      const docks = [dock_left, dock_right];
      const trial_data = {
        island_rt: null,
        island_key: null,
        island: null,
        boat_rt: null,
        boat_key: null,
        boat: null,
        reward: null,
        timeout: false,
        reward_probabilities: trial.reward_probabilities
      };
      const show_progress = function(percent) {
        progress_border.style.visibility = "visible";
        percent = Math.max(percent, 0);
        percent = Math.min(percent, 100);
        progress_bar.style.width = `${percent}%`;
      };
      const update_instructions = function(text) {
        if (trial.show_instructions && text !== null) {
          instructions.innerHTML = text;
          instructions_box.hidden = false;
        } else {
          instructions_box.hidden = true;
        }
      };
      const fade_in = (elem) => {
        elem.classList.add("fade_in");
        elem.classList.remove("fade_out");
        elem.classList.remove("partial_fade_out");
        elem.style.visibility = "visible";
        return waitForAnimation(elem);
      };
      const fade_out = (elem) => {
        elem.classList.add("fade_out");
        elem.classList.remove("fade_in");
        return waitForAnimation(elem);
      };
      const partial_fade_out = (elem) => {
        elem.classList.add("partial_fade_out");
        elem.classList.remove("fade_out");
        elem.classList.remove("fade_in");
        return waitForAnimation(elem);
      };
      const hide = (elem) => {
        elem.style.visibility = "hidden";
        elem.classList.remove("fade_in");
      };
      const show = (elem) => {
        elem.style.visibility = "visible";
        elem.classList.remove("fade_out");
        elem.classList.remove("partial_fade_out");
        elem.classList.remove("fade_in");
      };
      const zoom = (island) => {
        if (island === 0) {
          background_zoom.style.transformOrigin = "18.25% 51.33333333%";
        } else if (island === 1) {
          background_zoom.style.transformOrigin = "87.25% 51.33333333%";
        } else {
          throw "Invalid Island";
        }
        background_zoom.classList.add("zoomed");
        background_zoom.classList.remove("unzoomed");
        return waitForAnimation(background_zoom);
      };
      const quick_zoom = (island) => {
        if (island === 0) {
          background_zoom.style.transformOrigin = "18.25% 51.33333333%";
        } else if (island === 1) {
          background_zoom.style.transformOrigin = "87.25% 51.33333333%";
        } else {
          throw "Invalid Island";
        }
        background_zoom.style.transform = "scale(3.77358491, 3.77358491)";
        background_zoom.classList.remove("unzoomed");
      };
      const unzoom = function() {
        background_zoom.classList.add("unzoomed");
        background_zoom.classList.remove("zoomed");
        return waitForAnimation(background_zoom);
      };
      const end_trial = () => {
        jsPsych.pluginAPI.clearAllTimeouts();
        jsPsych.pluginAPI.cancelAllKeyboardResponses();
        display_element.innerHTML = "";
        jsPsych.finishTrial(trial_data);
      };
      const missed_response = () => {
        jsPsych.pluginAPI.clearAllTimeouts();
        jsPsych.pluginAPI.cancelAllKeyboardResponses();
        trial_data.timeout = true;
        const msg = `
              <p style="font-size: 20px; line-height: 1.5em">You did not respond within the allotted time.
              Please pay more attention on the next trial.`;
        display_element.innerHTML = msg;
        jsPsych.pluginAPI.setTimeout(end_trial, 5e3);
      };
      function readKey(valid_responses) {
        return new Promise((resolve) => {
          const f = function(response) {
            jsPsych.pluginAPI.clearAllTimeouts();
            jsPsych.pluginAPI.cancelAllKeyboardResponses();
            if (trial.choice_duration !== null) {
              jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
            }
            resolve(response);
          };
          jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: f,
            valid_responses,
            rt_method: "performance",
            persist: false,
            allow_held_key: false
          });
        });
      }
      function readKeyTimeout(valid_responses, timeout) {
        return new Promise((resolve) => {
          const success = function(response) {
            jsPsych.pluginAPI.clearAllTimeouts();
            jsPsych.pluginAPI.cancelAllKeyboardResponses();
            if (trial.choice_duration !== null) {
              jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
            }
            resolve(response);
          };
          const failure2 = function() {
            jsPsych.pluginAPI.clearAllTimeouts();
            jsPsych.pluginAPI.cancelAllKeyboardResponses();
            if (trial.choice_duration !== null) {
              jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
            }
            resolve({ key: null, rt: null });
          };
          jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: success,
            valid_responses,
            rt_method: "performance",
            persist: false,
            allow_held_key: false
          });
          jsPsych.pluginAPI.setTimeout(failure2, timeout);
        });
      }
      function show_reward(boat) {
        return __async(this, null, function* () {
          if (Math.random() <= trial.reward_probabilities[boat]) {
            trial_data.reward = 1;
            update_instructions("<p>The shopkeeper has treasure to share!</p><p>Press &lt;Space&gt; to claim the reward!</p>");
            show(reward);
            let response_reward;
            if (trial.reward_duration !== null) {
              response_reward = yield readKeyTimeout([" "], trial.reward_duration);
            } else {
              response_reward = yield readKey([" "]);
            }
            hide(reward);
            if (response_reward.key !== null) {
              update_instructions("<p>You received some treasure!</p>");
              show(plus_one);
              plus_one.style.top = "40%";
              yield fade_out(plus_one);
            } else {
              update_instructions("<p>You didn't respond in time!</p>");
              yield sleep(500);
            }
          } else {
            trial_data.reward = 0;
            update_instructions("<p>The shopkeeper had no treasure.</p><p>Press &lt;Space&gt; to continue</p>");
            show(failure);
            yield readKeyTimeout([" "], 2e3);
          }
          yield sleep(trial.end_dwell_time);
          diag_box.classList.add("diag_covered");
          diag_box.classList.remove("diag_uncovered");
          jsPsych.pluginAPI.setTimeout(end_trial, 300);
        });
      }
      function navigation_trial() {
        return __async(this, null, function* () {
          let boat;
          let island;
          let boat_side;
          update_instructions(trial.text_island_choice);
          if (trial.choice_duration !== null) {
            jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
          }
          const response_island = yield readKey(trial.stage_1_choices);
          if (response_island.key === "arrowleft") {
            island = 0;
          } else if (response_island.key === "arrowright") {
            island = 1;
          } else {
            throw "Invalid Island";
          }
          trial_data.island_key = response_island.key;
          trial_data.island_rt = response_island.rt;
          trial_data.island = island;
          update_instructions(null);
          yield zoom(island);
          yield Promise.all([
            fade_in(dock_left),
            fade_in(dock_right),
            fade_in(island_boats[island][0]),
            fade_in(island_boats[island][1])
          ]);
          update_instructions(trial.text_boat_choice);
          const response_boat = yield readKey(trial.stage_2_choices);
          if (response_boat.key === "arrowleft") {
            boat_side = 0;
          } else if (response_boat.key === "arrowright") {
            boat_side = 1;
          } else {
            throw "Invalid Boat";
          }
          boat = 2 * island + boat_side;
          trial_data.boat_key = response_boat.key;
          trial_data.boat_rt = response_boat.rt;
          trial_data.boat = boat;
          update_instructions(null);
          yield Promise.all([
            fade_out(docks[1 - boat_side]),
            fade_out(island_boats[island][1 - boat_side]),
            partial_fade_out(background_opacity)
          ]);
          yield sleep(200);
          yield show_reward(boat);
        });
      }
      function island_choice_only_trial() {
        return __async(this, null, function* () {
          let island;
          update_instructions(trial.text_island_choice);
          if (trial.choice_duration !== null) {
            jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
          }
          const response_island = yield readKey(trial.stage_1_choices);
          if (response_island.key === "arrowleft") {
            island = 0;
          } else if (response_island.key === "arrowright") {
            island = 1;
          } else {
            throw "Invalid Island";
          }
          trial_data.island_key = response_island.key;
          trial_data.island_rt = response_island.rt;
          trial_data.island = island;
          update_instructions(null);
          yield zoom(island);
          yield sleep(trial.end_dwell_time);
          diag_box.classList.add("diag_covered");
          diag_box.classList.remove("diag_uncovered");
          jsPsych.pluginAPI.setTimeout(end_trial, 300);
        });
      }
      function boat_choice_only_trial(island) {
        return __async(this, null, function* () {
          let boat;
          let boat_side;
          update_instructions(null);
          if (trial.choice_duration !== null) {
            jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
          }
          quick_zoom(island);
          yield Promise.all([
            fade_in(dock_left),
            fade_in(dock_right),
            fade_in(island_boats[island][0]),
            fade_in(island_boats[island][1])
          ]);
          update_instructions(trial.text_boat_choice);
          const response_boat = yield readKey(trial.stage_2_choices);
          if (response_boat.key === "arrowleft") {
            boat_side = 0;
          } else if (response_boat.key === "arrowright") {
            boat_side = 1;
          } else {
            throw "Invalid Boat";
          }
          boat = 2 * island + boat_side;
          trial_data.boat_key = response_boat.key;
          trial_data.boat_rt = response_boat.rt;
          trial_data.boat = boat;
          update_instructions(null);
          yield Promise.all([
            fade_out(docks[1 - boat_side]),
            fade_out(island_boats[island][1 - boat_side]),
            partial_fade_out(background_opacity)
          ]);
          yield sleep(200);
          yield show_reward(boat);
        });
      }
      function home_trial(boat) {
        return __async(this, null, function* () {
          show(fog)
          const boat_side = boat % 2;
          const island = boat < 2 ? 0 : 1;
          if (boat_side == 0) {
            fade_in(dock_left);
          } else {
            fade_in(dock_right);
          }
          fade_in(island_boats[island][boat_side]),
          update_instructions(trial.text_home_trial);
          if (trial.choice_duration !== null) {
            jsPsych.pluginAPI.setTimeout(missed_response, trial.choice_duration);
          }
          const response_boat = yield readKey(["ArrowUp"]);
          trial_data.boat_key = response_boat.key;
          trial_data.boat_rt = response_boat.rt;
          trial_data.boat = boat;
          update_instructions(null);
          yield Promise.all([
            partial_fade_out(background_opacity)
          ]);
          yield sleep(200);
          yield show_reward(boat);
        });
      }
      if (trial.progress !== null) {
        show_progress(trial.progress);
      }
      if (trial.island !== null) {
        boat_choice_only_trial(trial.island);
      } else if (trial.stage_2 === false) {
        island_choice_only_trial();
      } else if (trial.boat === null) {
        navigation_trial();
      } else {
        home_trial(trial.boat);
      }
    });
    return plugin;
  })();
})();
