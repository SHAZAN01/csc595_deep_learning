import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
  IconButton,
} from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  AcademicCapIcon,
  StarIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { teamData, contactData } from "@/data";

export function Home() {
  const customFeatures = [
    {
      title: "Student Marketplace",
      description:
        "Buy and sell textbooks, dorm essentials, and other peer-to-peer services.",
      icon: ShoppingCartIcon,
      color: "purple",
      link: "/marketplace",
    },
    {
      title: "Skill Share",
      description:
        "Connect with peers for collaborations, tutoring, mentoring, and professional growth.",
      icon: ComputerDesktopIcon,
      color: "brown",
      link: "/skill-share",
    },
    {
      title: "Torocare",
      description:
        "Access integrated health and wellness resources to support your campus life.",
      icon: ShieldCheckIcon,
      color: "green",
      link: "/torocare", // ✅ ADD LINK HERE
    },
    {
      title: "Roommate & Friend Matching",
      description:
        "Find compatible roommates and new friends to create a supportive community.",
      icon: UserGroupIcon,
      color: "pink",
    },
    {
      title: "Campus Events & Announcements",
      description:
        "Stay updated on upcoming campus events, study groups, and university news.",
      icon: AcademicCapIcon,
      color: "cyan",
    },
    {
      title: "Student Ratings Service",
      description:
        "Rate professors, courses, and campus facilities to help fellow students make informed choices.",
      icon: StarIcon,
      color: "yellow",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/StudentCampus.jpg')] bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography variant="h1" color="white" className="mb-6 font-black">
                Student Marketplace & Services Hub
              </Typography>
              <Typography variant="lead" color="white" className="opacity-90">
                Your one-stop platform for accessing essential student services.
              </Typography>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button variant="filled" className="bg-[#2870bd] hover:bg-[#19787f]">
                  Explore Now
                </Button>
                <Button variant="outlined" className="border-white text-white hover:bg-white hover:text-[#19787f]">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customFeatures.map((feature, index) => {
              const card = (
                <FeatureCard
                  key={index}
                  color={feature.color}
                  title={feature.title}
                  icon={React.createElement(feature.icon, {
                    className: "w-7 h-10 text-white",
                  })}
                  description={feature.description}
                />
              );

              return feature.link ? (
                <Link to={feature.link} key={index}>
                  {card}
                </Link>
              ) : (
                <div key={index}>{card}</div>
              );
            })}
          </div>

          {/* ABOUT / INFO SECTION */}
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#2870bd] p-2 text-center shadow-lg shadow-aqua-500/20">
                <BoltIcon className="h-8 w-8 text-white" />
              </div>
              <Typography variant="h3" className="mb-3 font-bold text-[#2870bd]">
                Empowering Toros to Succeed
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-800">
                At CampusConnect, we believe in the power of community. Whether
                you need to access essential services, connect with peers, or get
                campus support, our platform is designed to help you thrive.
              </Typography>
              <Button variant="filled" className="bg-[#2870bd] hover:bg-[#19787f]">
                Get Started
              </Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/CSUDH_pic.jpeg"
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Collaboration
                  </Typography>
                  <Typography variant="h5" color="blue-gray" className="mb-3 mt-2 font-bold">
                    Unite and Grow
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    Connect with fellow Toros for mentoring, tutoring, or forming
                    new friendships.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Mission" heading="Meet the Creators">
            We’re a team of students dedicated to improving campus life. Our
            mission is to bring all student services under one digital roof,
            making it easier for Toros to support each other.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Connect With Us" heading="Have Questions?">
            Drop us a message if you’d like to learn more about the platform,
            suggest a new feature, or collaborate on campus events.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-10x4 grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card key={title} color="transparent" shadow={false} className="text-center text-[#2870bd]">
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-[#2870bd] shadow-lg shadow-red-500/20">
                  {React.createElement(icon, { className: "w-7 h-10 text-white" })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle section="Stay in Touch" heading="We’d Love to Hear From You">
            Whether you’re looking to offer a service, share a skill, find a study group, or just say hi, let us know!
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography variant="small" color="gray" className="flex items-center font-normal">
                  I agree to the
                  <a href="#" className="font-medium transition-colors hover:text-gray-900">
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8 from-[#2870bd] to-[#19787f]" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
