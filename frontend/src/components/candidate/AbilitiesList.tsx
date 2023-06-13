import { Details, DidFilledSurvey } from "../../constants/candidate";
import { Loading } from "../../types/candidate";
import AbilitiesLoader from "./AbilitiesLoader";
import AbilityRange from "./AbilityRange";
import WorstAbilitiesList, { WorstAbilitiesLoader } from "./WorstAbilitiesList";

export default function AbilitiesList({
  abilities,
  profession,
  worst_abilities,
  loading,
  ...didFilledSurvey
}: Details & DidFilledSurvey & { loading: Loading }) {
  const hasBadAbilities =
    worst_abilities &&
    worst_abilities.customer_service?.length > 0 &&
    worst_abilities.office_administration?.length > 0 &&
    worst_abilities.sales?.length > 0;
  return (
    <div className="bg-white sm:rounded-3xl px-[8vw] py-10 sm:p-10 shadow-primaryBig gap-12 flex flex-col break-before-page">
      <div className="flex flex-col w-full">
        <h2 className="font-bold text-lg mb-8 print:hidden">
          Umiejętności kandydata do pracy na każdym stanowisku
        </h2>
        <div className="flex flex-col gap-8 md:grid grid-cols-3 print:grid print:gap-2">
          <div
            className={`flex flex-col gap-6 ${
              profession === "sales" ? "order-first" : "order-last"
            }`}
          >
            <h3 className="font-bold text-lg">Sprzedaż</h3>
            {!loading.page ? (
              <>
                {didFilledSurvey.sales ? (
                  abilities?.sales.map((ab) => (
                    <AbilityRange {...ab} profession="sales" key={ab.name} />
                  ))
                ) : (
                  <AbilityRange profession="sales" />
                )}
                <div className="flex flex-col sm:hidden gap-6">
                  {didFilledSurvey.sales &&
                    worst_abilities?.sales &&
                    worst_abilities.sales.map((ab) => (
                      <AbilityRange {...ab} key={ab.name} />
                    ))}
                </div>
              </>
            ) : (
              <AbilitiesLoader />
            )}
          </div>
          <div
            className={`flex flex-col gap-6 ${
              profession === "office_administration"
                ? "order-first"
                : "order-last"
            }`}
          >
            <h3 className="font-bold text-lg">Administracja</h3>
            {!loading.page ? (
              <>
                {didFilledSurvey.office_administration ? (
                  abilities?.office_administration.map((ab) => (
                    <AbilityRange
                      {...ab}
                      profession="office_administration"
                      key={ab.name}
                    />
                  ))
                ) : (
                  <AbilityRange profession="office_administration" />
                )}
                <div className="flex flex-col sm:hidden gap-6">
                  {didFilledSurvey.office_administration &&
                    worst_abilities?.office_administration &&
                    worst_abilities.office_administration.map((ab) => (
                      <AbilityRange {...ab} key={ab.name} />
                    ))}
                </div>
              </>
            ) : (
              <AbilitiesLoader />
            )}
          </div>
          <div
            className={`flex flex-col gap-6 ${
              profession === "customer_service" ? "order-first" : "order-last"
            }`}
          >
            <h3 className="font-bold text-lg">Obsługa klienta</h3>
            {!loading.page ? (
              <>
                {didFilledSurvey.customer_service ? (
                  abilities?.customer_service.map((ab) => (
                    <AbilityRange
                      {...ab}
                      profession="customer_service"
                      key={ab.name}
                    />
                  ))
                ) : (
                  <AbilityRange profession="customer_service" />
                )}
                <div className="flex flex-col sm:hidden gap-6">
                  {didFilledSurvey.customer_service &&
                    worst_abilities?.customer_service &&
                    worst_abilities.customer_service.map((ab) => (
                      <AbilityRange {...ab} key={ab.name} />
                    ))}
                </div>
              </>
            ) : (
              <AbilitiesLoader />
            )}
          </div>
        </div>
      </div>
      {hasBadAbilities &&
        worst_abilities &&
        (!loading.page ? (
          <WorstAbilitiesList {...worst_abilities} />
        ) : (
          <WorstAbilitiesLoader />
        ))}
    </div>
  );
}
