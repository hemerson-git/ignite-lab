import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WarningCircle } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";

import { Logo } from "../../components/Logo";
import { useCreateSubscriberMutation } from "../../graphql/generated";

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe() {
    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div
        className="
        w-full flex flex-col 
        items-center text-center justify-between 
        mt-20 mx-auto md:flex-row md:text-left md:max-w-[1100px]"
      >
        <div className="max-w-[640px]">
          <div className="mx-auto w-max md:mx-0">
            <Logo />
          </div>

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>

          <p className="mt-6 mb-12 px-5 text-gray-200 leading-relaxed md:mt-4 md:mb-0 md:px-0">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubmit(handleSubscribe)}
            className="flex flex-col gap-2 w-full"
          >
            <input
              {...register("name", { required: true })}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={classnames("bg-gray-900 rounded px-5 h-14", {
                "border border-red-400 focus-visible:outline-red-400":
                  errors.name,
              })}
              placeholder="Seu nome completo"
            />

            {errors.name && (
              <span className="text-sm text-red-400 px-2 flex gap-2 items-center">
                <WarningCircle size={20} />
                This field is required
              </span>
            )}

            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className={classnames("bg-gray-900 rounded px-5 h-14", {
                "border border-red-400 shadow-sm shadow-red-400": errors.name,
                "border-gray-400": !errors.email,
              })}
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            {errors.email && (
              <span className="text-sm text-red-400 px-2 flex gap-2 items-center">
                <WarningCircle size={20} />
                This field is required
              </span>
            )}

            <button
              disabled={loading}
              type="submit"
              className="
                mt-4 bg-green-500 uppercase py-4 rounded font-bold 
                text-sm hover:bg-green-700 transition-colors
                disabled:opacity-50
              "
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src="/code-mockup.png" className="mt-10 w-max" />
    </div>
  );
}
