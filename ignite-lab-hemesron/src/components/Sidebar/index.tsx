import { useGetLessonsQuery } from "../../graphql/generated";
import { Lesson } from "../Lesson";

export function Sidebar() {
  const { data } = useGetLessonsQuery();

  return (
    <aside
      className="
        w-[348px] bg-gray-700 p-6 border-l border-gray-600
        absolute top-20 z-50 right-0 bottom-0 md:relative md:top-0
      "
    >
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => (
          <Lesson
            title={lesson.title}
            slug={lesson.slug}
            type={lesson.lessonType}
            availableAt={new Date(lesson.availableAt)}
            key={lesson.id}
          />
        ))}
      </div>
    </aside>
  );
}
