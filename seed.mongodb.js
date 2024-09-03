/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
// Select the database to use.

use("kgopinion");

// generate seed 
// Generate seed data for users
const users = [
  {
    username: "Kratosgado",
    email: "kratosgado@example.com",
    password: "28935617Aa@",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    isAdmin: true
  },
  {
    username: "Zebulleto",
    email: "zebulleto@example.com",
    password: "28935617Aa@",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    isAdmin: true
  },
  {
    username: "AliceWonder",
    email: "alice@example.com",
    password: "28935617Aa@",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    isAdmin: false
  },
  {
    username: "BobBuilder",
    email: "bob@example.com",
    password: "28935617Aa@",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    isAdmin: false
  }
];

// Insert users
db.users.insertMany(users);

const registedUsers = db.getCollection("users").find();

console.log(registedUsers);

// Generate seed data for posts
const posts = [
  {
    title: "The Future of Artificial Intelligence: Opportunities and Challenges",
    desc: "An in-depth look at the rapidly evolving field of AI and its potential impact on society",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    userId: "66d7071473d2767c03faf82c",
    slug: "future-of-artificial-intelligence",
    body: "Artificial Intelligence (AI) has become one of the most transformative technologies of our time. As we stand on the brink of a new era, it's crucial to examine both the immense potential and the significant challenges that AI presents. This post delves into the current state of AI, exploring its applications across various industries such as healthcare, finance, and transportation. We'll discuss the ethical considerations surrounding AI development, including issues of privacy, bias, and job displacement. Furthermore, we'll look at the exciting possibilities AI offers for solving complex global problems and enhancing human capabilities. Join us as we navigate through the intricate landscape of AI, considering its implications for our future and the steps we need to take to ensure its responsible development and implementation.",
  },
  {
    title: "Sustainable Living: Small Changes for a Big Impact",
    desc: "Practical tips and strategies for adopting a more environmentally friendly lifestyle",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1313&q=80",
    userId: "66d7071473d2767c03faf82d",
    slug: "sustainable-living-small-changes",
    body: "In an era of climate change and environmental degradation, sustainable living has become more important than ever. This comprehensive guide explores how small, everyday changes can collectively make a significant impact on our planet. We'll cover a wide range of topics, from reducing energy consumption and minimizing waste to adopting eco-friendly transportation methods and supporting sustainable businesses. Learn about the benefits of a plant-based diet, the importance of conscious consumerism, and how to create a more sustainable home environment. We'll also discuss the ripple effect of individual actions and how they can inspire community-wide change. Whether you're just starting your sustainability journey or looking to take your eco-friendly lifestyle to the next level, this post offers valuable insights and actionable steps to help you make a positive difference for our planet.",
  },
  {
    title: "The Art of Mindfulness: Cultivating Peace in a Busy World",
    desc: "Exploring the benefits of mindfulness and practical techniques for incorporating it into daily life",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
    userId: "66d7071473d2767c03faf82e",
    slug: "art-of-mindfulness",
    body: "In our fast-paced, constantly connected world, finding moments of peace and presence can seem like an impossible task. This post delves into the transformative practice of mindfulness and its potential to enhance our overall well-being. We'll explore the scientific research behind mindfulness, including its benefits for mental health, stress reduction, and improved focus. Learn about various mindfulness techniques, from basic breathing exercises to more advanced meditation practices, and how to integrate them seamlessly into your daily routine. We'll also discuss the role of mindfulness in improving relationships, boosting creativity, and fostering a greater sense of self-awareness. Whether you're a busy professional, a parent juggling multiple responsibilities, or simply someone looking to find more balance in life, this guide offers practical strategies to help you cultivate a more mindful approach to living. Discover how the simple act of being present can lead to profound changes in your life and help you navigate the challenges of our modern world with greater ease and clarity.",
  },
  {
    title: "The Rise of Remote Work: Challenges and Opportunities",
    desc: "Exploring the shift towards remote work and its impact on businesses and employees",
    img: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    userId: "66d7071473d2767c03faf82f",
    slug: "rise-of-remote-work",
    body: "The global pandemic has accelerated a trend that was already in motion: the shift towards remote work. This post examines the profound changes this transition has brought to the workplace landscape. We'll discuss the benefits of remote work, including increased flexibility, improved work-life balance, and access to a global talent pool. However, we'll also address the challenges, such as maintaining team cohesion, ensuring productivity, and addressing the potential for burnout. The post will explore innovative solutions and best practices for effective remote team management, communication strategies, and the use of technology to bridge the physical gap. We'll also consider the long-term implications of this shift, including its impact on urban planning, real estate, and the future of office spaces. Whether you're an employer adapting to this new reality or an employee navigating the world of remote work, this post offers valuable insights into making the most of this transformative trend.",
  },
  {
    title: "The Power of Habit: Transforming Your Life One Step at a Time",
    desc: "Understanding the science of habit formation and strategies for positive change",
    img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
    userId: "66d7071473d2767c03faf82c",
    slug: "power-of-habit",
    body: "Habits are the invisible architecture of our daily lives, shaping our behavior, productivity, and ultimately, our success. This post delves into the fascinating science behind habit formation and how understanding this process can be a powerful tool for personal transformation. We'll explore the habit loop - cue, routine, reward - and how to leverage this knowledge to break bad habits and form positive ones. The post will offer practical strategies for setting achievable goals, creating effective routines, and maintaining motivation throughout the change process. We'll also discuss the role of willpower, the importance of environment in habit formation, and how to overcome common obstacles. Whether you're looking to improve your health, boost your productivity, or achieve personal growth, this guide provides a roadmap for harnessing the power of habits to create lasting, positive change in your life.",
  },
  {
    title: "Exploring the Wonders of Space: Recent Discoveries and Future Missions",
    desc: "A journey through recent astronomical findings and upcoming space exploration projects",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    userId: "66d7071473d2767c03faf82f",
    slug: "wonders-of-space",
    body: "The realm of space exploration continues to captivate our imagination and push the boundaries of human knowledge. This post takes readers on a cosmic journey, highlighting recent astronomical discoveries that have reshaped our understanding of the universe. We'll explore breakthroughs in our comprehension of black holes, exoplanets, and the early universe, and discuss how these findings are changing our perspective on our place in the cosmos. The post will also provide an overview of exciting upcoming space missions, including plans for further Mars exploration, missions to the outer solar system, and the search for extraterrestrial life. We'll examine the potential benefits of space exploration for life on Earth, including technological advancements and solutions to global challenges. Join us as we look to the stars and consider the profound implications of our ongoing quest to understand the universe.",
  },
  {
    title: "The Impact of Social Media on Modern Society",
    desc: "An analysis of how social platforms are reshaping communication, relationships, and information flow",
    img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    userId: "66d7071473d2767c03faf82d",
    slug: "impact-of-social-media",
    body: "Social media has become an integral part of our daily lives, fundamentally changing the way we communicate, share information, and perceive the world around us. This post delves into the multifaceted impact of social platforms on modern society. We'll explore how social media has revolutionized personal relationships, business practices, and political landscapes. The discussion will cover both the positive aspects, such as increased connectivity and democratization of information, as well as the challenges, including privacy concerns, the spread of misinformation, and the potential for addiction. We'll examine the psychological effects of social media use, its influence on youth development, and its role in shaping public opinion. The post will also look at emerging trends in social media and speculate on its future evolution. By understanding the profound influence of these platforms, we can better navigate the digital landscape and harness its potential while mitigating its drawbacks.",
  },
  {
    title: "The Future of Renewable Energy: Innovations and Challenges",
    desc: "Exploring cutting-edge developments in sustainable energy and the path to a greener future",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    userId: "66d7071473d2767c03faf82d",
    slug: "future-of-renewable-energy",
    body: "As the world grapples with climate change and the need for sustainable energy solutions, renewable energy technologies are at the forefront of innovation. This comprehensive post examines the latest advancements in renewable energy, from improved solar cell efficiency and next-generation wind turbines to emerging technologies like tidal power and advanced geothermal systems. We'll discuss the potential of energy storage solutions, smart grids, and the integration of artificial intelligence in energy management. The post will also address the challenges facing widespread adoption of renewable energy, including infrastructure requirements, economic considerations, and policy hurdles. We'll explore case studies of countries and communities successfully transitioning to renewable energy sources and the lessons we can learn from their experiences. By understanding the current state and future potential of renewable energy, we can better appreciate the path towards a more sustainable and resilient energy future.",
  },
  {
    title: "The Science of Nutrition: Separating Fact from Fiction",
    desc: "A comprehensive look at current nutritional research and debunking common food myths",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80",
    userId: "66d7071473d2767c03faf82f",
    slug: "science-of-nutrition",
    body: "In an age of information overload, separating nutritional facts from fads and fiction can be challenging. This post aims to clarify the often confusing world of nutrition by examining the latest scientific research and debunking common food myths. We'll explore the roles of macronutrients and micronutrients in our diet, discuss the impact of different eating patterns on health, and look at how individual factors like genetics and lifestyle influence nutritional needs. The post will address popular diets, superfoods, and supplements, evaluating their claims against scientific evidence. We'll also delve into the relationship between nutrition and chronic diseases, the gut microbiome's role in health, and the future of personalized nutrition. By providing a clear, science-based perspective on nutrition, this post aims to empower readers to make informed decisions about their diet and overall health.",
  }
];

// Insert posts
db.posts.insertMany(posts);

console.log("Seed data inserted successfully");
