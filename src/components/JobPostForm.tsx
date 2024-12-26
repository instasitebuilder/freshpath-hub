import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    responsibilities: "",
    companyInfo: "",
    applyUrl: "",
    companyUrl: "",
    logoUrl: "/placeholder.svg", // Default logo
    postDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Job posted successfully!");
        // Reset form
        setFormData({
          title: "",
          company: "",
          location: "",
          type: "",
          salary: "",
          description: "",
          responsibilities: "",
          companyInfo: "",
          applyUrl: "",
          companyUrl: "",
          logoUrl: "/placeholder.svg",
          postDate: new Date().toISOString().split('T')[0],
        });
      } else {
        toast.error("Failed to post job");
      }
    } catch (error) {
      toast.error("Error posting job");
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Job Type</Label>
          <Input
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="salary">Salary Range</Label>
        <Input
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="responsibilities">Responsibilities</Label>
        <Textarea
          id="responsibilities"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          required
          placeholder="Enter responsibilities, one per line"
        />
      </div>

      <div>
        <Label htmlFor="companyInfo">About Company</Label>
        <Textarea
          id="companyInfo"
          name="companyInfo"
          value={formData.companyInfo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="applyUrl">Application URL</Label>
        <Input
          id="applyUrl"
          name="applyUrl"
          type="url"
          value={formData.applyUrl}
          onChange={handleChange}
          required
          placeholder="https://example.com/apply"
        />
      </div>

      <div>
        <Label htmlFor="companyUrl">Company Website</Label>
        <Input
          id="companyUrl"
          name="companyUrl"
          type="url"
          value={formData.companyUrl}
          onChange={handleChange}
          required
          placeholder="https://example.com"
        />
      </div>

      <Button type="submit" className="w-full">
        Post Job
      </Button>
    </form>
  );
};