export const introduction_text = [
    {
        stimulus: 
            `<p> Welcome! Please remember to stay in fullscreen mode and don't click away from the experiment. </p>`,
        audio: './assets/audio/introduction_text_1.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> Today you will be playing a game to earn treasure. </p>
            <p> At the end of the experiment, you will earn a bonus based on how much treasure you find. </p>
            <img src='./assets/img/instructions/treasure.jpg' class='instructions-image'>`,
        audio: './assets/audio/introduction_text_2.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> Animals have hidden treasure in treasure chests. </p>
            <p> You need to first find an animal and then choose which of their treasure chests to search. </p>
            <img src='./assets/img/space/animals/cat.jpg' class='instructions-image'>`,
        audio: './assets/audio/introduction_text_3.wav',
        button: "Next",
    },
    {
        stimulus:
            `<p> In each round, you will search for treasure in a different place. In the real game, there will be two rounds. </p>
            <p> You will begin with a separate, practice round where you will search for treasure in outer space. </p>
            <img src='./assets/img/space/0.jpg' class='instructions-image'>`,
        audio: './assets/audio/introduction_text_4.wav',
        button: "Next",
    },
    {
        stimulus:
            `<p> On every turn, you will see a picture of the place that you are in, but the specific image may be different each time. </p>
            <p> For example, both of these images mean you are in outer space. </p>
            <img src='./assets/img/instructions/outerspace.jpg' class='instructions-image'>`,
        audio: './assets/audio/introduction_text_5.wav',
        button: "Next",
    }, 
    {
        stimulus:
            `<p> You need to decide which direction to travel in. </p>
            <p> You can choose between going <b>up or down</b> by using the arrow keys. </p>
            <img src='./assets/img/instructions/updown.jpg' class='instructions-image'>`,
        audio: './assets/audio/introduction_text_6.wav',
        button: "Next",
    }, 
    {
        stimulus:
            `<p> You will have <b>2 seconds</b> to make your choice. </p>
            <p> If you do not make a choice within 2 seconds, you will not find an animal or earn treasure. </p>
            <img src='./assets/img/instructions/2seconds.jpg' class='instructions-image'>`,
        audio: './assets/audio/introduction_text_7.wav',
        button: "Next",
    }, 
    {
        stimulus:
            `<p> Let’s try practicing that now! </p>
            <p> When you see a picture of the place you are in, press the <b>up</b> key to travel up. </p>
            <img src='./assets/img/instructions/pressUp.jpg' class='instructions-image'>`,
        audio: './assets/audio/introduction_text_8.wav',
        button: "Start",
    }
];

export const travel_down_practice = [
    {
        stimulus:
            `<p> Great job! Now try pressing the <b>down</b> key to travel down. </p>
            <img src='./assets/img/instructions/pressDown.jpg' class='instructions-image'>`,
        audio: './assets/audio/travel_down_practice.wav',
        button: "Start",
    }
]

export const treasure_search_practice = [
    {
        stimulus: 
            `<p> The animals don’t move, so the animal in the upper part of a place will stay in the upper part of a place, and the animal in the lower part of a place will stay in the lower part of a place. </p>`,
            audio: './assets/audio/treasure_search_practice_1.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> Each animal has two treasure chests for you to choose from. </p>
            <p> The amount of treasure in each chest can range from <b> 0 to 40 pieces.</b></p>`,
        audio: './assets/audio/treasure_search_practice_2.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> You should decide which chest to search for treasure by using the <b>left</b> and <b>right</b> arrow keys. </p>
            <p><b> Pay attention to which animal is on the screen, as the animals have different treasure chests. </b></p>
            <img src='./assets/img/instructions/leftright.jpg' class='instructions-image'>`,
        audio: './assets/audio/treasure_search_practice_3.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> Let’s try practicing that now. </p>
            <p> When you see an animal, choose which chest to search for treasure. </p>
            <img src='./assets/img/instructions/chooseChest.jpg' class='instructions-image'>`,
        audio: './assets/audio/treasure_search_practice_4.wav',
        button: "Start",
    },
]

export const full_practice = [
    {
        stimulus: 
            `<p> Great job. Now let’s try putting it together. </p>
            <p> On each turn, you will first see a picture to remind you of the place you are in, and you need to choose whether to go up or down. </p>
            <p> Then you will see an animal and choose which of its chests to search for treasure. </p>`,
        audio: './assets/audio/full_practice_1.wav',
        button: "Next",
    }, 
    {
        stimulus: 
            `<p> When you choose whether to go up or down, try to go to the animal with the chest with the most treasure. </p>
            <p> Try practicing that now! </p>`,
        audio: './assets/audio/full_practice_2.wav',
        button: "Start",
    },
]

export const catch_practice = [
    {
        stimulus: 
            `<p> One last thing: sometimes, you will see a robber. The robber can be anywhere in the picture. </p>
            <p> If you do not stop them, you will lose treasure. </p>
            <img src='./assets/img/instructions/robber.jpg' class='instructions-image'>`,
        audio: './assets/audio/catch_practice_1.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> If you see the robber, you should <b>press the space bar</b> rather than using the arrow keys. </p>
            <p> Try practicing that now! </p>`,
        audio: './assets/audio/catch_practice_2.wav',
        button: "Start",
    },
]

export const beep_practice_instructions = [
    {
        stimulus: 
            `<p> Sometimes, you will come across a special kind of treasure chest that requires a password. </p>
            <img src='./assets/img/instructions/beep_chest.jpg' class='instructions-image'>`,
        audio: './assets/audio/beep_1.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> Your friend will send you the password using a series of beeps so that you can open the chest and earn treasure. </p>
            <p> You will hear two kinds of beeps, a high beep and a low beep. </p>
            <p> You should report the number of high beeps that you heard before seeing the chest. </p>
            <img src='./assets/img/instructions/listen.jpg' class='instructions-image'>`,
        audio: './assets/audio/beep_2.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> For example, if you hear this series of beeps, you should report 4 as the password using the slider. </p>
            <p> After reporting a password for a chest, you should count the high beeps again starting from 0. </p>
            <p> Let's try practicing that now. </p>`,
        audio: './assets/audio/beep_3.wav',
        button: "Next",
    },
]

export const beep_practice = [
    {
        right_response: '<p>Correct! There were 6 high pitched beeps before you saw the chest. </p>',
        wrong_response: '<p>Incorrect! Please try again. Remember to count the number of high pitched beeps only. </p>',
        audio_stim: './assets/audio/beeps/practice_6.wav',
        beeps: 6,
        right_audio: './assets/audio/beep_practice_1r.wav',
        wrong_audio: './assets/audio/beep_practice_wrong.wav',
    },
    {
        right_response: '<p>Correct! There were 4 high pitched beeps before you saw the chest. </p>',
        wrong_response: '<p>Incorrect! Please try again. Remember to count the number of high pitched beeps only. </p>',
        audio_stim: './assets/audio/beeps/practice_4.wav',
        beeps: 4,
        right_audio: './assets/audio/beep_practice_2r.wav',
        wrong_audio:  './assets/audio/beep_practice_wrong.wav',
    },
]


export const beep_practice_complete = [
    {
        stimulus: 
            `<p> Good job! In the real game we will not tell you if you entered the right password. </p>
            <p> Do your best, the treasure you earn from these chests will also give you extra bonus money. </p>`,
        audio: './assets/audio/beep_practice_complete.wav',
        button: "Next",
    },
]

export const task_comprehension_instructions = [
    {
        stimulus:
            `<p> Before you start, we're going to ask you a few questions about how the game works. </p>`,
        audio:  './assets/audio/task_comprehension_instructions.wav',
        button: "Next",
    }
];

export const task_comprehension = [
    {
        stimulus: 
            `<p> <b> True or False? </b> </p>
            <p> There can be 50 pieces of treasure in a given animal's chest. </p>`,
        correct_button: 1,
        right_response: "<p> <b> That's right! </b> The amount of treasure in each chest can range from 0 to 40 pieces. </p>",
        wrong_response: "<p> <b>Incorrect.</b> The amount of treasure in each chest can range from 0 to 40 pieces. </p>",
        audio_stim: './assets/audio/task_comp_1.wav',
        right_audio: './assets/audio/task_comp_1r.wav',
        wrong_audio: './assets/audio/task_comp_1w.wav',
    },
    {
        stimulus: "<p> <b> True or False? </b> </p>" +
            "<p> In this game, all animals have the same amount of treasure in their left and right chests. </p>",
        correct_button: 1,
        right_response: "<p> <b> That's right! </b> Animals have different amounts of treasure in their treasure chests. </p>",
        wrong_response: "<p> <b>Incorrect.</b> Animals have different amounts of treasure in their treasure chests. </p>",
        audio_stim: './assets/audio/task_comp_2.wav',
        right_audio: './assets/audio/task_comp_2r.wav',
        wrong_audio: './assets/audio/task_comp_2w.wav',
    },
    {
        stimulus: "<p> <b> True or False? </b> </p>" +
            "<p> The same animal will always be there if you go up in the same place. </p>",
        correct_button: 0,
        right_response: "<p> <b> That's right! </b> One animal lives in the upper part and one lives in the lower part of every place. </p>",
        wrong_response: "<p> <b>Incorrect.</b> One animal lives in the upper part and one lives in the lower part of every place. </p>",
        audio_stim: './assets/audio/task_comp_3.wav',
        right_audio: './assets/audio/task_comp_3r.wav',
        wrong_audio: './assets/audio/task_comp_3w.wav',
    },
    {
        stimulus: "<p> <b> True or False? </b> </p>" +
        "<p> If you see a different picture, it means you are in a new place. </p>",
        correct_button: 1,
        right_response: "<p> <b> That's right! </b> Lots of different images may show the same place. For example,  you may see three different images that all remind you that you are in outer space. </p>",
        wrong_response: "<p> <b>Incorrect.</b> Lots of different images may show the same place. For example,  you may see three different images that all remind you that you are in outer space. </p>",
        audio_stim: './assets/audio/task_comp_4.wav',
        right_audio: './assets/audio/task_comp_4r.wav',
        wrong_audio: './assets/audio/task_comp_4w.wav',
    }
];

export const initial_rest = [
    {
        stimulus: 
            `<p> After you explore a place to find treasure, it will be time to play a different game. </p>
            <p> During this game, red dots will appear on the screen and fall down slowly. </p>
            <p><b> You must click on them before they reach the bottom. </b></p>
            <img src='./assets/img/instructions/dotGame.jpg' class='instructions-image'>`,
        audio: './assets/audio/initial_rest_1.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> For every dot you click, you will earn additional treasure. </p>
            <p> Let’s try practicing that now. </p>`,
        audio: './assets/audio/initial_rest_2.wav',
        button: "Start",
    }
]

export const practice_block = [
    {
        stimulus: 
            `<p> Now, you will practice a shortened version of the game to get a sense of how it all fits together. </p>`,
        audio: './assets/audio/practice_block.wav',
        button: "Next",
    },
    {
        stimulus: `<p>This time you are searching for treasure in outer space.</p>`,
        audio: './assets/audio/transitions_instructions_space.wav',
        button: "Next",
    },
]

export const ready_to_begin = [
    {
        stimulus: 
            `<p> Good job. Remember to do your best because the amount of treasure you earn will be converted into bonus money. </p>
            <p> It’s time to start the real game! </p>`,
        audio: './assets/audio/ready_to_begin.wav',
        button: "Next",
    },
]

export const transitions_instructions = [
    {
        stimulus: `<p> This time you are searching for treasure in the <b>[ENVIRONMENT]</b>.</p>`,
        audio: './assets/audio/transitions_instructions_[ENVIRONMENT].wav',
        button: "Next",
    },
    {
        stimulus: `<p><b>New</b> animals with <b>new</b> treasure chests live here. You need to explore to discover where the animal with the best treasure chest is.</p>
                    <p> Like before, once you figure out which animal has the chest with the most treasure, you should try to get to that animal and select that chest! </p>`,
        audio: './assets/audio/transitions_instructions_2.wav',
        button: "Next",
    },
    /*{
        stimulus: 
            `<p> First, you will make choices to learn which animal lives in the upper part of the land and which animal lives in the lower part of the land. </p>
            <p> You will <b>not</b> be searching for treasure yet. </p>
            <p> Remember, when you see a picture of the environment, <b>press up or down to find an animal</b>. </p>`,
        audio: './assets/audio/blank.wav',
        button: "Start",
    }*/
]

export const value_instructions = [
    {
        stimulus: 
            /*`<p> Great job! Now you will use what you learned to try to find the most treasure. </p>
            <p> This time, when you encounter an animal, you should <b>use the left and right arrow keys to select a treasure chest</b>. </p>`,*/
            `<p> Remember, when you see a picture of the place, use the up and down keys to <b>find an animal</b>.</p>
            <p> When you encounter an animal, you should use the left and right keys to <b>select a treasure chest</b>.</p>
            <p> Don't forget to look out for the robber! </p>`,
        audio:  './assets/audio/value_instructions.wav',
        button: "Next",
    }
]

export const revaluation_instructions = [
    {
        stimulus: 
            `<p> Now, you will travel with a friend who will choose whether you go up or down first. </p>
            <p> On these turns, you will just see the animal that they found. You will still get to choose which chest to search for treasure.</p>`,
        audio:  './assets/audio/revaluation_1.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> In this part, you will also hear beeps from your friend and see special treasure chests that need a password. </p>
            <p> Do your best to count the high beeps <b>and</b> choose between each animals' chests at the same time.</p>
            <img src='./assets/img/instructions/beep_chest.jpg' class='instructions-image'>`,
        audio:  './assets/audio/revaluation_2.wav',
        button: "Next",
    }
]

export const short_rest_instructions = [
    {
        stimulus: 
            `<p> Time to play the dot game! </p>
            <p> For 15 seconds, click the red dots on the following screen as they appear. </p>`,
        audio:  './assets/audio/short_rest_instructions.wav',
        button: "Start",
    }
]

export const rest_instructions = [
    {
        stimulus: 
            `<p> Time to play the dot game! </p>
            <p> For one minute, click the red dots on the following screen as they appear. </p>
            <p><b> Don't look away, as you will earn bonus for clicking dots</b>. </p>`,
        audio:  './assets/audio/rest_instructions.wav',
        button: "Start",
    }
]

export const first_test_instructions = [
    {
        stimulus: 
            `<p> You have almost finished this part of the game! </p>
            <p> We are going to ask you to make a few more choices. </p>`,
        audio:  './assets/audio/first_test_instructions_1.wav',
        button: "None",
    },
    {
        stimulus: 
            `<p> First, you need to decide whether to go up or down. When you see each picture, use the arrow keys to make your choice. </p>
            <p><b>You will not see which animal you found, but try to get to the one that will give you the most treasure.</b></p>`,
        audio:  './assets/audio/first_test_instructions_2.wav',
        button: "None",
    }
]

export const second_test_instructions = [
    {
        stimulus: 
            `<p> Now you will see the animals again and can search their chests for treasure. </p>
            <p> This time, you will not see how much treasure you earned, but you will earn more bonus money for making better choices. </p>`,
        audio:  './assets/audio/second_test_instructions.wav',
        button: "None",
    }
]

export const memory_instructions = [
    {
        stimulus: `<p> Great! You have finished the treasure game </p>`,
        audio:  './assets/audio/memory_instructions_1.wav',
        button: "Next",
    },
    {
        stimulus: `<p> Now, we are going to ask you to try to remember the pictures that you saw during the game. </p>`,
        audio:  './assets/audio/memory_instructions_2.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> On every trial, you will see an image. </p>
            <p> The image may be an <b>old</b> image you saw during the game or a <b>new</b> image that has not been shown before. </p>`,
            audio:  './assets/audio/memory_instructions_3.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> You should select whether the image is:  </p>
            <p>  'Definitely old', 'Maybe old', 'Maybe new', or 'Definitely new.'  </p>
            <img src='./assets/img/memory/choices.jpg' class='instructions-image'>`,
        audio:  './assets/audio/memory_instructions_4.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> You should use the 1, 2, 3, and 4 keys to make your responses.  </p>
            <img src='./assets/img/memory/numberedChoices.jpg' class='instructions-image'>`,
        audio:  './assets/audio/memory_instructions_5.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> You will have <b>10 seconds</b> to make each response. </p>
            <p>  Make sure to respond before time runs out! </p>
            <img src='./assets/img/memory/10second.jpg' class='instructions-image'>`,
        audio:  './assets/audio/memory_instructions_6.wav',
        button: "Next",
    },
    {
        stimulus: 
            `<p> Before you play the real game, it is time to practice. </p>
            <p>  Just like in the real game, some of the images in the practice will be ones you have seen before. </p>
            <p>  Others will be entirely new. </p>`,
        audio:  './assets/audio/memory_instructions_7.wav',
        button: "Start",
    }];
  
export const memory_comprehension_instructions = [
    {
        stimulus: 
            `<p> Great! You have completed the practice. </p>
            <p> Before you start, we're going to ask you a few questions about how the game works.</p>`,
        audio:  './assets/audio/memory_comprehension_instructions.wav',
        button: "Next",
    }
];

export const memory_comprehension = [ 
    {
        stimulus: "<p> <b> True or False? </b> </p>" +
        "<p> You should use the mouse and click to make your response. </p>",
        correct_button: 1,
        right_response: "<p><b> That's right! </b> You should use the '1', '2', '3', and '4' keys to make your response. </p>",
        wrong_response: "<p><b> Incorrect. </b> You should use the '1', '2', '3', and '4' keys to make your response. </p>",
        audio_stim: './assets/audio/memory_comp_1.wav',
        right_audio: './assets/audio/memory_comp_1r.wav',
        wrong_audio: './assets/audio/memory_comp_1w.wav',
    },
    {
        stimulus: "<p> <b> True or False? </b> </p>" +
        "<p> You will have as much time as you want to make each choice. </p>",
        correct_button: 1,
        right_response: "<p> <b> That's right! </b> You will only have 10 seconds to make each choice. </p>",
        wrong_response: "<p> <b>Incorrect.</b> You will only have 10 seconds to make each choice.</p>",
        audio_stim: './assets/audio/memory_comp_2.wav',
        right_audio: './assets/audio/memory_comp_2r.wav',
        wrong_audio: './assets/audio/memory_comp_2w.wav',
    }
]

export const memory_start = [
    {
        stimulus: 
            `<p> Great! You are now ready to begin the game. </p>
            <p> Remember, use the 1, 2, 3, and 4 keys to make your responses. </p>`,
        audio:  './assets/audio/memory_start.wav',
        button: "Next",
    }
];

