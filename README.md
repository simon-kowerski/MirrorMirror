# Mirror Mirror

Mirror Mirror is a Generative AI project that wass developed in 24 hours for the 2025 Rutgers HackHers hackathon. This is a webapp that allows users to take pictures of their own artwork and the world around them to generate magical scenes using generative AI. Users are able to collaborate to create images which combine the favorite parts of the world around them.

### The Team:
- [Joseph Nathan Field](https://github.com/glockatoo31) (he/him) B.S. Aerospace Engineering, Minor Entreprenureship
- [Simon Kowerski](https://github.com/simon-kowerski) (they/them) B.S. Computer Science, B.A. Music
- [Serene Siu](https://github.com/serenexy) (she/her) B.S. Computer Science, Minor Cognitive Science, Minor Physics
- [Tim Wilburn](https://github.com/TimIsNotPro) (he/him) B.S. Mechanical Engineering

## Boccer Sall
Late at night where would I go\
As I'm tossing to and fro\
Underneath here __**lies**__ the key\
Who knows what could it be

## Inspiration

Every member of our group has a deep love for art. Our members draw, sing, compose music, and collectively play 8 instruments. With the advent of generative AI, it pained us to see artists being pushed to the side and replaced by machines. We, however, recognize the power and potential of these technologies to augment art and creativity while allow many people to collaborate on a single work. We want to provide everyone with the ability to contribute to something magical. Mirror mirror was born from this idea. We want everyone to have a space to share something the love in the world. Their art and photographs combined tell a story that deserves to be told.

## What it does

Mirror Mirror is a webapp that allows users to take pictures of their own artwork and the world around them to generate magical scenes using generative AI. Users are able to collaborate to create images which combine the favorite parts of the world around them.

## How we built it

Being a team with an engineering background the very first thing we did was break the project up into small "subsystems" (yay systems engineering). We split the tasks up into smaller parts. Serene and Simon worked on the bulk of the AI research and back end, while Joe and Tim handled building/designing the web apps and front end. The AI system is broken up into two parts - image description and image generation. The first step is to take the new image and run it through clip interrogator to generate a prompt for stable diffusion to use. This prompt is combined with the prompt that generated the current mural, and stored so it does not have to be generated again. This combined prompt is then sent to Stable Diffusion which (locally) generates the new image and updates our website.

To develop our frontend and website, we set up a live demo project using Node.js and built our elements with HTML, CSS, and JavaScript.

## Challenges we ran into
Our first big challenge was figuring out how to do the things we had set out to do. We had a clear vision of the project we wanted to create but none of us actually had the technical experience to do it. We spent many hours running large generative AI models on out laptops before we realized it would take a tenth of the time to run on our desktops. Not knowing what tools we had available to us left us going many hours trying to run a website without Node.js. It was a very steep learning curve for all of us, especially at the beginning, and a lot of our early progress was hindered by this lack of knowledge.

Additionally, when working with our generative AI model we realized part way through that we were being limited in the number of tokens we could pass in to our prompt. This required us to completely rework the way we combined our prompts in order to have elements of both images come through.

## What we learned
We learned all of the skills for this project when we started working on the project. Every tool we used was new to us at the time of starting this project, which include:
- Integrating python backend with html/css front end
- Using javascript for process automation and file transfer
- Implement and locally running generative AI models

## Accomplishments that we're proud of
We are very with this entire entire project. The fact that none of us have ever used any of these development tools made this project feel like a long shot at the beginning, however seeing the project come together over the course of the day made us all very proud of ourselves. Overcoming the hurdle of efficiently running the stable diffusion model while generating images we were happy with was a huge step for us, and we did a lot of optimizations to be able to use the specific model that we wanted. Additionally, getting these models integrated with our webapp was a group effort that we were able to look back on with pride.

## What's next for Mirror Mirror
The initial goal of Mirror Mirror was to have the site be a platform which allows people to create art together. We would love to be able to allow users to create separate murals in different art styles to reflect their own tastes. This aspect of community is currently lost in our prototype, and is something we would love to add in later releases. Hosting the server locally is also something that is not sustainable. The hope is to be able to have our site properly hosted and available for most of the world to use!
