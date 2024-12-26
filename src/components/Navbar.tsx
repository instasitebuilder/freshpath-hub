import { Code2, Sun, Moon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JobPostForm } from "./JobPostForm";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-background border-b border-border fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">FreshStart</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-primary">
              Find Jobs
            </Link>
            <Link to="/" className="text-foreground hover:text-primary">
              Resources
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Post a Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Post a New Job</DialogTitle>
                </DialogHeader>
                <JobPostForm />
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};