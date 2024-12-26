import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, MapPin, BriefcaseIcon } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  logoUrl: string;
  onClick: () => void;
}

export const JobCard = ({ 
  title, 
  company, 
  location, 
  type, 
  description, 
  logoUrl,
  onClick 
}: JobCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt={`${company} logo`}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-primary">{title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Building2 className="w-4 h-4" />
                <span>{company}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <BriefcaseIcon className="w-4 h-4" />
            <span>Entry Level</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        <Button onClick={onClick} variant="outline" className="w-full">
          See Details
        </Button>
      </CardContent>
    </Card>
  );
};