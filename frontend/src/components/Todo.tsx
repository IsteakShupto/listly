export interface TodoProps {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: {
    email: string;
    username: string;
    address: string;
  };
}

export const Todo = ({ id, title, content, published, author }: TodoProps) => {
  return (
    <div key={id} className="shadow-md p-4 mb-3 rounded-md">
      <h3 className="text-3xl font-extrabold pb-1">{title}</h3>
      <p className="pb-1">{content}</p>
      <p className="pb-1">
        {published === false ? "Draft version" : "Published"}
      </p>
      <p>
        Created by: <span className="font-extrabold">{author.email}</span>
      </p>
    </div>
  );
};
