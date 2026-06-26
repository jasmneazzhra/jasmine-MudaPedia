import Card from "@/components/ui/Card";

export default function DashboardPage() {

    return (

        <>

            <h1 className="mb-8 text-3xl font-bold">

                Welcome Back 👋

            </h1>

            <div className="grid grid-cols-3 gap-6">

                <Card>

                    <h2 className="text-gray-500">

                        Total Portfolio

                    </h2>

                    <p className="mt-2 text-4xl font-bold">

                        12

                    </p>

                </Card>

                <Card>

                    <h2 className="text-gray-500">

                        Total Views

                    </h2>

                    <p className="mt-2 text-4xl font-bold">

                        250

                    </p>

                </Card>

                <Card>

                    <h2 className="text-gray-500">

                        Last Updated

                    </h2>

                    <p className="mt-2 text-xl">

                        Today

                    </p>

                </Card>

            </div>

        </>

    );

}