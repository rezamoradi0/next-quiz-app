import { motion } from "framer-motion";
import ButtonBack from "@/components/modules/form/ButtonBack";
import TextInputLegend from "@/components/modules/form/TextInputLegend";
import TextArea from "@/components/modules/form/TextArea";
import ButtonAddPanelItem from "@/components/modules/form/ButtonAddPanelItem";
import Button from "@/components/modules/form/Button";
import ItemsOrigin from "@/components/modules/menu/ItemsOrigin";
import ItemsTarget from "@/components/modules/menu/ItemsTarget";

function CreateCourse() {
  return (
    <motion.div
      transition={{ duration: 0.7 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex  w-full flex-col justify-start  rounded-xl border border-zinc-700 bg-zinc-900"
    >
      <div className="flex min-h-16 items-center justify-between border-b border-b-zinc-700 p-4">
        <ButtonBack />
        <span className="text-lg">Add New Course</span>
        <Button text="Save" className="bg-sky-500 text-gray-50" />
      </div>

      <form className="flex w-full flex-col items-start justify-start gap-y-8 px-20 py-4">
        <p className="my-4">General Information</p>
        <div className="flex w-full flex-wrap gap-x-4">
          <TextInputLegend placeholder="Course Name (en)" />
          <TextInputLegend dir="rtl" placeholder="نام دوره (fa)" />
        </div>

        <div className="flex w-full  items-center  gap-x-4">
          <TextArea tab={"Description (En)"} id={"descriptionEn"} />
          <TextArea tab={"توضیحات (Fa)"} id={"descriptionFa"} dir={"rtl"} />
        </div>

        <div className="flex w-full flex-col gap-y-4">
          <div className="flex  items-center justify-between ">
            <p className="my-4">Levels</p>
            <ButtonAddPanelItem text="Level" />
          </div>
          <div className="flex w-full items-stretch justify-between gap-x-8">
            <ItemsTarget
              header={"Levels "}
              dataArray={[{ name: "Start", id: 1 }]}
            />

            <ItemsOrigin
              header={"Available  Levels"}
              dataArray={[
                { name: "Intern", id: 2 },
                { name: "Junior", id: 3 },
                { name: "MidLevel", id: 4 },
                { name: "Senior", id: 5 },
              ]}
            >
              <Button className="my-4 bg-yellow-500" text="Create Level"/>
              </ItemsOrigin>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default CreateCourse;
