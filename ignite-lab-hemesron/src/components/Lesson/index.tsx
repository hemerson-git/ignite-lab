import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, availableAt, type, slug }: LessonProps) {
  const { slug: paramsSlug } = useParams<{ slug: string }>();
  const isActiveLesson = paramsSlug === slug;

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'MM",
    {
      locale: ptBr,
    }
  );

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={classnames(
          `
          rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500)`,
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classnames(
                "text-smfont-medium flex items-center gap-2",
                {
                  "text-blue-500": !isActiveLesson,
                  "text-white": isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className="font-medium flex items-center gap-2 text-orange-500">
              <Lock size={20} />
              Em Breve
            </span>
          )}

          <span
            className={classnames(
              "text-uppercase text-xs rounded px-2 py-[0.125rem] text-white border font-bold",
              {
                "border-green-300": !isActiveLesson,
                "border-white": isActiveLesson,
              }
            )}
          >
            {type === "live" ? "Ao vivo" : "Aula Prática"}
          </span>
        </header>

        <strong
          className={classnames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
