import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Profile } from "@/lib/api"

interface ProfileDisplayProps {
  profile: Profile
}

export function ProfileDisplay({ profile }: ProfileDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Tech Stack</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {profile.tech_stack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">Background</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {profile.background.map((bg) => (
                <Badge key={bg} variant="outline">
                  {bg}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
