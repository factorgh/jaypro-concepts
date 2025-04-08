import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Head Photographer',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000',
    bio: 'Sarah has over 10 years of experience in professional photography with a keen eye for detail and composition.'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Video Director',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000',
    bio: 'Michael brings cinematic vision to all projects with his background in film production and storytelling.'
  },
  {
    id: 3,
    name: 'Emma Chen',
    role: 'Sound Engineer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000',
    bio: 'Emma is a master of audio with experience working on award-winning music productions and podcasts.'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Studio Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
    bio: 'David ensures everything runs smoothly with his organizational skills and attention to detail.'
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden z-0">
          <img 
            src="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=2070"
            alt="Studio Equipment"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About JayPro Concept
            </h1>
            <p className="text-xl text-gray-300">
              Creating exceptional visual and audio content since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2010, JayPro began as a small photography operation and has since grown into a full-service creative studio offering photography, videography, and audio recording services.
              </p>
              <p className="text-gray-700 mb-4">
                We believe in the power of visual and audio storytelling to connect people, share ideas, and inspire action. Our team of professionals brings decades of combined experience to every project.
              </p>
              <p className="text-gray-700">
                Over the years, we've had the privilege of working with individuals, small businesses, and major brands to bring their creative visions to life. We pride ourselves on delivering exceptional quality and service.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2070" 
                alt="Our Studio" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at JayPro Concept.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Value 
              title="Creativity" 
              description="We approach every project with fresh ideas and innovative thinking to deliver unique results."
            />
            <Value 
              title="Quality" 
              description="We never compromise on quality, using the best equipment and techniques for exceptional outcomes."
            />
            <Value 
              title="Client Focus" 
              description="We prioritize understanding and meeting our clients' needs, ensuring their vision comes to life."
            />
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are passionate about creating exceptional content.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={member.id}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Studio Equipment */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Equipment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We invest in professional-grade equipment to ensure the highest quality results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EquipmentCategory 
              title="Photography" 
              items={["Professional DSLR Cameras", "Studio Lighting", "Backdrops", "Lenses & Accessories"]}
            />
            <EquipmentCategory 
              title="Videography" 
              items={["4K Cameras", "Stabilizers & Gimbals", "Drones", "Editing Stations"]}
            />
            <EquipmentCategory 
              title="Audio" 
              items={["Condenser Microphones", "Soundproof Recording Room", "Mixing Console", "Acoustic Treatment"]}
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

type ValueProps = {
  title: string;
  description: string;
};

const Value = ({ title, description }: ValueProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-md text-center"
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

type TeamMemberProps = {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  index: number;
};

const TeamMember = ({ member, index }: TeamMemberProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-lg overflow-hidden shadow-md"
  >
    <img 
      src={member.image} 
      alt={member.name} 
      className="w-full h-64 object-cover"
    />
    <div className="p-5">
      <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
      <p className="text-indigo-600 mb-3">{member.role}</p>
      <p className="text-gray-600">{member.bio}</p>
    </div>
  </motion.div>
);

type EquipmentCategoryProps = {
  title: string;
  items: string[];
};

const EquipmentCategory = ({ title, items }: EquipmentCategoryProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-indigo-600 mr-2">•</span>
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default About;
