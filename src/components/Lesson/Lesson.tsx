import { CheckCircle, Lock } from "phosphor-react";
import { isPast , format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from 'react-router-dom';
import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}
function Lesson( props : LessonProps) {
  const { slug } = useParams<{ slug: string }>()
  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd 'de' MMMM' • 'k'h'mm", {
    locale: ptBR
  });

  const isActiveLesson = slug === props.slug;
  return (
    <div>
       <Link to={`/event/lesson/${props.slug}`} className="group">
        <span className="text-gray-300"> 
          { availableDateFormatted }
        </span>
       
        <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',{
          'bg-green-500' : isActiveLesson,
        })}>
          <header className="flex items-center justify-between">
           {
            isLessonAvailable ? (
              <span className={classNames('text-sm font-medium flex item-center gap-2',{
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson

              })}> 
                <CheckCircle size={20}/>
                Conteúdo liberado
              </span>
            ) :
            (
              <span className="text-sm text-orange-500 font-medium flex item-center gap-2"> 
                <Lock size={20}/>
                Em breve
              </span>
            )
           }
            <span className={classNames('text-xs rounded border py-[0.125rem] px-2 text-white font-bold', {
              'border-withe': isActiveLesson,
              'border-green-300' : !isActiveLesson
            })}>
               {
                props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'
               } 
            </span>
          </header>
        
          <strong className={classNames('mt-5 block',{
            'text-white mt-5 block' : isActiveLesson,
            'text-gray-200' : !isActiveLesson,
          })}>
           { props.title }
          </strong>
        </div>
       </Link>
       
    </div> 
  )
}

export default Lesson;
