import {
    getTrainingRequestByRequestId,
    updateTrainingRequest,
  } from "@/actions/training_request.action";
  import { NextResponse } from "next/server";
  
  export async function POST(req: Request) {
    const body: { status: string; request_id: string } = await req.json();
    if (body.status === "OK" && body.request_id) {
      const { trainingRequest } = await getTrainingRequestByRequestId(
        body.request_id
      );
      if (trainingRequest) {
        console.log("===================================");
        try {
          const response = await fetch(
            `https://rest.alpha.fal.ai/requests/${body.request_id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Key ${process.env.FAL_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
  
          const { config_file, diffusers_lora_file } = data.json_output;
          console.log("===================================");
          console.log(config_file, diffusers_lora_file);
          await updateTrainingRequest(trainingRequest.request_id, {
            config_file,
            diffusers_lora_file,
            status: "completed",
          });
        } catch (error) {
          console.error("Error fetching request status:", error);
        }
      }
    }
  
    return NextResponse.json({ success: true });
  }
  