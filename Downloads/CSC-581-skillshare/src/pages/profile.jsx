import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";

export function Profile() {
  return (
    <>
      {/* HEADER BACKGROUND */}
      <section className="relative block h-[50vh]">
        {/* Burgundy background image */}
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-red-900/60 bg-cover bg-center" />
      </section>

      {/* PROFILE CONTENT */}
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              {/* PROFILE INFO */}
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src="/img/team-5.png"
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                    John Toro
                  </Typography>
                  <Typography
                    variant="paragraph"
                    color="gray"
                    className="!mt-0 font-normal"
                  >
                    jtoro@csudh.edu
                  </Typography>
                </div>
              </div>

              {/* ACTIONS / STATS */}
              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <Button className="bg-blue-600 hover:bg-blue-900 w-fit lg:ml-auto">
                  Connect
                </Button>
                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      22
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Friends
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Photos
                    </Typography>
                  </div>
                  <div className="p-3 text-center lg:mr-4">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      89
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Comments
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION / BIO */}
            <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-red-900" />
                <Typography className="font-medium text-red-900">
                  Carson, California
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-red-900" />
                <Typography className="font-medium text-red-900">
                  Peer Mentor - CampusConnect Services
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-red-900" />
                <Typography className="font-medium text-red-900">
                  CampusConnect
                </Typography>
              </div>
            </div>

            <div className="mb-10 py-6">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  An involved Toro who loves collaborating with other students
                  on projects, study groups, and campus events. Passionate
                  about creating a supportive community for all students.
                </Typography>
                <Button variant="text" className="text-red-900">
                  Show more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
