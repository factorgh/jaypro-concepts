import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  featured: boolean;
};

type VideoType = {
  id: string;
  title: string;
  youtubeId: string;
  description: string;
};

type ServicesContextType = {
  services: Service[];
  videos: VideoType[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
  addVideo: (video: Omit<VideoType, 'id'>) => void;
  updateVideo: (id: string, video: Omit<VideoType, 'id'>) => void;
  deleteVideo: (id: string) => void;
};

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

type ServicesProviderProps = {
  children: ReactNode;
};

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    // Load services from localStorage
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }

    // Load videos from localStorage
    const storedVideos = localStorage.getItem('videos');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    }
  }, []);

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: Date.now().toString(),
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const updateService = (id: string, service: Omit<Service, 'id'>) => {
    const updatedServices = services.map(s => 
      s.id === id ? { ...service, id } : s
    );
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const deleteService = (id: string) => {
    const updatedServices = services.filter(s => s.id !== id);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const addVideo = (video: Omit<VideoType, 'id'>) => {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
    };
    const updatedVideos = [...videos, newVideo];
    setVideos(updatedVideos);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const updateVideo = (id: string, video: Omit<VideoType, 'id'>) => {
    const updatedVideos = videos.map(v => 
      v.id === id ? { ...video, id } : v
    );
    setVideos(updatedVideos);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  const deleteVideo = (id: string) => {
    const updatedVideos = videos.filter(v => v.id !== id);
    setVideos(updatedVideos);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
  };

  return (
    <ServicesContext.Provider value={{ 
      services, 
      videos,
      addService, 
      updateService, 
      deleteService,
      addVideo,
      updateVideo,
      deleteVideo
    }}>
      {children}
    </ServicesContext.Provider>
  );
};
