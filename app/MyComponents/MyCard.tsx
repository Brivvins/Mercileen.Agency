import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type cardProps = {
  title: string,
  description: string,
  content: string,
  footer: React.ReactNode,
}

const MyCard = ({title,description, content, footer}: cardProps) => {
  return (
    <Card className=" shadow-sm transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:shadow-primary z-10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
};

export default MyCard;
