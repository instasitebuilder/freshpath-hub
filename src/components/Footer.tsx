import { Github, Linkedin, Twitter, Facebook, Mail, Phone } from "lucide-react";

const positions = [
  "Software Developer (Fresher)",
  "Junior Software Engineer",
  "Web Developer (Fresher)",
  "Front-End Developer (Fresher)",
  "Back-End Developer (Fresher)",
  "Full-Stack Developer (Fresher)",
  "Python Developer (Fresher)",
  "Java Developer (Fresher)",
  "React Developer (Fresher)",
  "AI/ML Developer (Fresher)",
  "Data Scientist (Fresher)",
  "Quality Analyst (Fresher)",
  "Systems Analyst (Fresher)",
  "IT Support Engineer (Fresher)",
  "DevOps Engineer (Fresher)",
];

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">About FreshStart</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Helping fresh graduates find their dream tech jobs and start their careers.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5" />
                <a href="mailto:contact@freshstart.com">contact@freshstart.com</a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5" />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Position Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {positions.map((position) => (
                <button
                  key={position}
                  onClick={() => console.log(`Filter by: ${position}`)}
                  className="text-left text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:underline"
                >
                  {position}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} FreshStart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};